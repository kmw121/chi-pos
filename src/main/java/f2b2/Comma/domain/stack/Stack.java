package f2b2.Comma.domain.stack;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.apache.catalina.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Stack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String stackName;

    @JsonIgnoreProperties({"user","stack"})
    @OneToMany(mappedBy = "stack")
    private List<UserStack> userStack = new ArrayList<>();
}
