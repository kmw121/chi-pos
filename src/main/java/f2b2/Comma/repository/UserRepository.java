package f2b2.Comma.repository;

import f2b2.Comma.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByNickName(String nickName);

    Optional<User> findByKakaoId(String kakaoId);

    Optional<User> findByGoogleId(String googleId);
}
