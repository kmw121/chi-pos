package f2b2.Comma.repository;

import f2b2.Comma.domain.stack.UserStack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserStackRepository extends JpaRepository<UserStack,Long> {
    @Modifying
    @Query(value = "INSERT INTO user_stack(user_id, stack_id) VALUES(:userId, :stackId)",nativeQuery = true)
    void saveStack(Long userId,Long stackId);

    @Modifying
    @Query(value = "DELETE from user_stack where user_id = :userId",nativeQuery = true)
    void deleteUserStack(Long userId);
}
