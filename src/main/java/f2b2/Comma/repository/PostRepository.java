package f2b2.Comma.repository;

import f2b2.Comma.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.EntityManager;
import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByUserId(Long userId);
    @Modifying
    @Query("update Post p set p.view = p.view + 1 where p.id = :id")
    void updateView(Long id);
}
