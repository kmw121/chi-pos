package f2b2.Comma.controller;

import f2b2.Comma.domain.post.Post;
import f2b2.Comma.domain.post.PostService;
import f2b2.Comma.domain.stack.PostStackService;
import f2b2.Comma.domain.user.UserService;
import f2b2.Comma.dto.CMRespDto;
import f2b2.Comma.dto.post.PostDto;
import f2b2.Comma.dto.post.PostsDto;
import f2b2.Comma.handler.exception.CustomException;
import f2b2.Comma.repository.PostStackRepository;
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
import java.util.List;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
public class PostController {
    private final UserService userService;
    private final PostService postService;
    private final PostStackService postStackService;
    private final PostStackRepository postStackRepository;
    @Value("${jwt.secret}")
    private String secretKey;


    @Transactional
    @PostMapping(value = "/post",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> postJWT(@Valid @RequestBody PostDto postDto, BindingResult bindingResult, @RequestHeader HttpHeaders headers){

        if(postDto.getId()==null){
            Post post = postDto.toEntity();
            post.setEnd("false");
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(headers.get("Authorization").get(0));
            post.setUser(userService.find(Long.parseLong(claims.getBody().get("id").toString())));
            Post postEntity = postService.save(post);


            if (postDto.getStack() != null) {
                for (Long n : postDto.getStack()) {
                    postStackService.save(postEntity.getId(), n);
                }
            }


           return new ResponseEntity<>(new CMRespDto<>(1, "글쓰기 성공", postEntity.getTitle()), HttpStatus.OK);
        }

        else{
            Post post = postService.find(postDto.getId());
            post.setCategoryType(postDto.getCategoryType());
            post.setPeople(postDto.getPeople());
            post.setDuration(postDto.getDuration());
            post.setHowto(postDto.getHowto());
            post.setStartDate(postDto.getStartDate());
            post.setContact(postDto.getContact());
            post.setContactAddress(postDto.getContactAddress());
            post.setTitle(postDto.getTitle());
            post.setDetail(postDto.getDetail());

            if (postDto.getStack() != null) {
                postStackRepository.deletePostStack(post.getId());
                for (Long n : postDto.getStack()) {
                    postStackService.save(post.getId(), n);
                }
            }


            return new ResponseEntity<>(new CMRespDto<>(1, "글수정 성공", "제목 : " +post.getTitle()), HttpStatus.OK);
        }
    }

    @GetMapping("/posts/all")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(new CMRespDto<>(1, "글조회 성공", postService.findAll()), HttpStatus.OK);
    }

    @PostMapping("/posts")
    public ResponseEntity<?> findPosts(@RequestBody PostsDto postsDto){

        System.out.println("page : " + postsDto.getPage());
        System.out.println("size : " + postsDto.getSize());
        System.out.println("stack : " + postsDto.getStack());
        System.out.println("isEnd : " + postsDto.getIsEnd());
        System.out.println("category : " + postsDto.getCategoryType());

        String query = " where ";
        boolean flag = true;

        Integer page = postsDto.getPage()!=null ? postsDto.getPage() : 1;
        Integer size = postsDto.getSize()!=null ? postsDto.getSize() : 6;
        int start = (page-1) * size;

        if(postsDto.getStack()!=null&&postsDto.getStack().length!=0){


            for(String s : postsDto.getStack()){
                if(flag) {
                    query = "INNER JOIN post_stack ps ON ps.post.id = p.id" + query + "( ps.stack = " + s;
                    flag = false;
                }
                else{
                    query = query + "or ps.stack = " + s;
                }
            }
            query = query + " ) ";
        }

        if(postsDto.getIsEnd()!=null&&postsDto.getIsEnd().equals("false")) {
            if(flag) {
                query = query + " p.end = 'false' ";
                flag = false;
            }
            else{
                query = query + " AND p.end = 'false' ";
            }

        }

        if(postsDto.getCategoryType()!=null){
            if(postsDto.getCategoryType().equals("스터디")){
                if(flag) {
                    query = query + " p.categoryType = '스터디' ";
                    flag = false;
                }
                else{
                    query = query + " AND p.categoryType = '스터디' ";
                }
            }
            else if(postsDto.getCategoryType().equals("프로젝트")){
                if(flag) {
                    query = query + " p.categoryType = '프로젝트' ";
                    flag = false;
                }
                else{
                    query = query + " AND p.categoryType = '프로젝트' ";
                }
            }
        }

        if(flag){
            List<Post> posts = postService.findAll("SELECT DISTINCT p FROM Post p order by p.modifiedDate desc ", start, size);

            for(Post p : posts) {
                System.out.println(p.getId() + "번째 글");
            }

            if(posts.size()==0){
                return new ResponseEntity<>(new CMRespDto<>(-1, "글이 존재하지 않습니다.", null), HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(new CMRespDto<>(1, "글조회 성공", posts), HttpStatus.OK);
            }
        }
        else{

            List<Post> posts = postService.findAll("SELECT DISTINCT p FROM Post p "+query + " order by p.modifiedDate desc ",start,size);

            for(Post p : posts) {
                System.out.println(p.getId() + "번째 글");
            }

            if(posts.size()==0){
                return new ResponseEntity<>(new CMRespDto<>(-1, "글이 존재하지 않습니다.", null), HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(new CMRespDto<>(1, "글조회 성공", posts), HttpStatus.OK);
            }
        }
    }

    @Transactional
    @PostMapping("/end/{postId}")
    public ResponseEntity<?> endJWT(@PathVariable Long postId,@RequestHeader HttpHeaders headers){
        System.out.println("여기까지 됨.");
        Post post = postService.find(postId);
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(headers.get("Authorization").get(0));
        if(post.getUser().getId() != Long.parseLong(claims.getBody().get("id").toString())){
            System.out.println("이거 오류임.");
            return new ResponseEntity<>(new CMRespDto<>(-1, "로그인 정보와 게시글 작성자가 일치하지 않습니다.", null), HttpStatus.OK);
        };
        post.setEnd("true");
        return new ResponseEntity<>(new CMRespDto<>(1, "마감 적용 성공", post), HttpStatus.OK);
    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<?> deleteJWT(@PathVariable Long postId,@RequestHeader HttpHeaders headers){

        Post post = postService.find(postId);

        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(headers.get("Authorization").get(0));
        if(post.getUser().getId() != Long.parseLong(claims.getBody().get("id").toString())){
            return new ResponseEntity<>(new CMRespDto<>(-1, "로그인 정보와 게시글 작성자가 일치하지 않습니다.", null), HttpStatus.OK);
        };

        postService.delete(postId,post);
        return new ResponseEntity<>(new CMRespDto<>(1, "삭제 성공", null), HttpStatus.OK);
    }

    @GetMapping("/post/view/{postId}")
    public ResponseEntity<?> postView(@PathVariable Long postId){
        postService.viewCount(postId);
        return new ResponseEntity<>(new CMRespDto<>(1, "조회수 상승", null), HttpStatus.OK);
    }


}
