package f2b2.Comma.repository;

import f2b2.Comma.domain.stack.Stack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StackRepository extends JpaRepository<Stack,Long> {
}
