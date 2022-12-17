package f2b2.Comma.domain.user;

import f2b2.Comma.handler.exception.CustomException;
import f2b2.Comma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public User save(User user){
        User userEntity = userRepository.save(user);
        return userRepository.findById(userEntity.getId()).get();
    }

    public User find(Long id){
        User user = userRepository.findById(id).orElseThrow(()->{
            return new CustomException("존재하지 않는 회원입니다.");
        });

        return user;
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

}
