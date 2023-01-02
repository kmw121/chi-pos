package f2b2.Comma.domain.post;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import f2b2.Comma.domain.BaseTimeEntity;
import f2b2.Comma.domain.user.User;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Post extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String categoryType;
    private String people;
    private String duration;

    @JsonIgnoreProperties({"post","id","createdDate","modifiedDate"})
    @OneToMany(mappedBy = "post",fetch = FetchType.LAZY)
    private List<PostStack> postStack = new ArrayList<>();

    private Date startDate;
    private String contact;

    private String howto;
    private String contactAddress;
    private String title;
    private String detail;
    private String end;
    @Column(columnDefinition = "integer default 0", nullable = false)
    private int view;

    @JsonIgnoreProperties({"posts","userStack","imageUrl","createDate","hibernateLazyInitializer","createdDate","modifiedDate"})
    @JoinColumn(name = "userId")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;


    @OneToMany(mappedBy = "post",fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();



}
