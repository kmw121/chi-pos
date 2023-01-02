package f2b2.Comma.domain.stack;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import f2b2.Comma.domain.BaseTimeEntity;
import lombok.Data;
import org.apache.catalina.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Stack extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;
    private String isPopular;
    private String name;


    @JsonIgnore
    @OneToMany(mappedBy = "stack",fetch = FetchType.LAZY)
    private List<UserStack> userStack = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "stack",fetch = FetchType.LAZY)
    private List<UserStack> postStack = new ArrayList<>();

}
