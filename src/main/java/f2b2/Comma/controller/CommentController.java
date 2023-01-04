package f2b2.Comma.controller;

import f2b2.Comma.domain.post.Comment;
import f2b2.Comma.domain.post.CommentService;
import f2b2.Comma.domain.post.Post;
import f2b2.Comma.domain.post.PostService;
import f2b2.Comma.domain.user.UserService;
import f2b2.Comma.dto.CMRespDto;
import f2b2.Comma.dto.post.CommentDto;
import f2b2.Comma.handler.exception.CustomException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
public class CommentController {
    private final PostService postService;
    private final UserService userService;
    private final CommentService commentService;
    @Value("${jwt.secret}")
    private String secretKey;

    @Transactional
    @PostMapping(value = "/comment",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postCommentJWT(@Valid @RequestBody CommentDto commentDto, BindingResult bindingResult, @RequestHeader HttpHeaders headers){
        Comment comment = commentDto.toEntity();
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(headers.get("Authorization").get(0));
        Long userId = Long.parseLong(claims.getBody().get("id").toString());
        Post post = postService.find(commentDto.getPostId());
        comment.setPost(post);

        comment.setUser(userService.find(userId));
        Comment commentEntity = commentService.save(comment);
        post.getComments().add(commentEntity);

        return new ResponseEntity<>(new CMRespDto<>(1, " 코멘트 작성 성공2", commentEntity), HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping(value = "/comment/{commentId}")
    public ResponseEntity<?> deleteCommentJWT(@PathVariable Long commentId,@RequestHeader HttpHeaders headers){
        Comment comment = commentService.find(commentId);
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(headers.get("Authorization").get(0));
        Long userId = Long.parseLong(claims.getBody().get("id").toString());
        if(comment.getUser().getId()!=userId){
            throw new CustomException("댓글을 지울 권한이 없습니다.");
        }
        commentService.delete(comment);

        return new ResponseEntity<>(new CMRespDto<>(1, " 코멘트 삭제 성공", null), HttpStatus.OK);
    }


}
