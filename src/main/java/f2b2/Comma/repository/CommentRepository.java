package f2b2.Comma.repository;

import f2b2.Comma.domain.post.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Modifying
    @Query(value = "DELETE from comment where post_id = :postId",nativeQuery = true)
    void deletePostComment(Long postId);

    @Modifying
    @Query(value = "DELETE from comment where user_id = :userId",nativeQuery = true)
    void deleteUserComment(Long userId);
}
