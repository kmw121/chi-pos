package f2b2.Comma.dto.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostsDto {
    private String[] stack;
    private Integer page;
    private Integer size;
    private String isEnd;
    private String categoryType;
}
