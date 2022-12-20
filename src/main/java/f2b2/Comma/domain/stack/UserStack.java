package f2b2.Comma.domain.stack;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import f2b2.Comma.domain.user.User;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "userstack_uk",
                        columnNames = {"userId","stackId"}
                )
        }
)
public class UserStack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @JoinColumn(name = "userId")
    @ManyToOne
    private User user;


    @JsonIgnoreProperties({"userStack","id"})
    @JoinColumn(name = "stackId")
    @ManyToOne
    private Stack stack;

    private LocalDateTime createDate;
}
