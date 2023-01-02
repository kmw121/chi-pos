package f2b2.Comma.dto.post;

import f2b2.Comma.domain.post.Comment;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CommentDto {

    @NotNull(message = "내용을 입력해주세요.")
    private String detail;

    @NotNull(message = "게시글 번호를 입력해주세요.")
    private Long postId;

    public Comment toEntity(){
        Comment comment = new Comment();
        comment.setDetail(detail);
        return comment;
    }
}
