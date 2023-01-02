package f2b2.Comma.repository;

import f2b2.Comma.domain.post.PostStack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PostStackRepository extends JpaRepository<PostStack, Long> {
    @Modifying
    @Query(value = "INSERT INTO post_stack(post_id, stack_id) VALUES(:postId, :stackId)",nativeQuery = true)
    void saveStack(Long postId,Long stackId);

    @Modifying
    @Query(value = "DELETE from post_stack where post_id = :postId",nativeQuery = true)
    void deletePostStack(Long postId);
}
