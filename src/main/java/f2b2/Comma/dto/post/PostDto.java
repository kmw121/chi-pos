package f2b2.Comma.dto.post;

import f2b2.Comma.domain.post.Post;
import f2b2.Comma.repository.PostRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
public class PostDto {

    private Long id;
    @NotNull(message = "카테고리를 입력해주세요.")
    private String categoryType;
    @NotNull(message = "인원을 입력해주세요.")
    private String people;
    @NotNull(message = "기간을 입력해주세요.")
    private String duration;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "시작일을 입력해주세요.")
    private Date startDate;

    @NotNull(message = "온라인/오프라인을 입력해주세요.")
    private String howto;

    private List<Long> stack;
    @NotNull(message = "연락방식을 입력해주세요.")
    private String contact;
    @NotNull(message = "연락주소를 입력해주세요.")
    private String contactAddress;
    @NotNull(message = "제목을 입력해주세요.")
    private String title;
    @NotNull(message = "내용을 입력해주세요.")
    private String detail;

    public Post toEntity(){
        Post post = new Post();
        post.setCategoryType(categoryType);
        post.setPeople(people);
        post.setDuration(duration);
        post.setStartDate(startDate);
        post.setContact(contact);
        post.setContactAddress(contactAddress);
        post.setTitle(title);
        post.setDetail(detail);
        post.setHowto(howto);

        return post;
    }
}
