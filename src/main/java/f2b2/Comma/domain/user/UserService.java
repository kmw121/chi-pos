package f2b2.Comma.domain.user;

import f2b2.Comma.domain.Commnet.CommentService;
import f2b2.Comma.domain.post.Post;
import f2b2.Comma.domain.post.PostService;
import f2b2.Comma.domain.stack.UserStackService;
import f2b2.Comma.handler.exception.CustomException;
import f2b2.Comma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PostService postService;
    private final UserStackService userStackService;
    private final CommentService commentService;


    @Transactional
    public User save(User user){
        String prePassword = user.getPassword();
        String Password = passwordEncoder.encode(prePassword);
        user.setPassword(Password);
        User userEntity = userRepository.save(user);
        return userRepository.findById(userEntity.getId()).get();
    }

    @Transactional(readOnly = true)
    public User find(Long id){
        User user = userRepository.findById(id).orElseThrow(()->{
            return new CustomException("존재하지 않는 회원입니다.");
        });

        return user;
    }
    @Transactional(readOnly = true)
    public User findByUsername(String username){
       User user = userRepository.findByUsername(username).orElseThrow(()->{
            return new CustomException("존재하지 않는 회원입니다.");
        });
        return user;
    }

    public User findByNickName(String nickName){
        User user = userRepository.findByNickName(nickName).orElseThrow(()->{
            return new CustomException("존재하지 않는 회원입니다.");
        });
        return user;
    }

    @Transactional(readOnly = true)
    public List<User> findAll(){
        return userRepository.findAll();
    }

    @Transactional
    public User login(String username,String password){
        User user = findByUsername(username);
        if(passwordEncoder.matches(password,user.getPassword())){
            return user;
        }
        else{
            throw  new CustomException("아이디 비밀번호가 맞지 않습니다.");
        }
    }
    public void delete(Long userId){
        List<Post> posts = postService.findAllByUser(userId);
        commentService.deleteByUser(userId);
        userStackService.delete(userId);
        for(Post p : posts){
            Long postId = p.getId();
            postService.delete(postId,p);
        }


        userRepository.deleteById(userId);
    }


}
