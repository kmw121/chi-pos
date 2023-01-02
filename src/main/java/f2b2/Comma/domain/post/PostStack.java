package f2b2.Comma.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import f2b2.Comma.domain.BaseTimeEntity;
import f2b2.Comma.domain.stack.Stack;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity(name = "post_stack")
@Table(

        uniqueConstraints = {
                @UniqueConstraint(
                        name = "poststack_uk",
                        columnNames = {"postId","stackId"}
                )
        }
)
public class PostStack extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @JoinColumn(name = "postId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;


    @JsonIgnoreProperties({"userStack","hibernateLazyInitializer","createdDate","modifiedDate"})
    @JoinColumn(name = "stackId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Stack stack;


}
