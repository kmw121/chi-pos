package f2b2.Comma.controller;

import f2b2.Comma.config.provider.JwtTokenProvider;
import f2b2.Comma.domain.stack.StackService;
import f2b2.Comma.domain.stack.UserStackService;
import f2b2.Comma.domain.user.User;
import f2b2.Comma.domain.user.UserService;
import f2b2.Comma.dto.CMRespDto;
import f2b2.Comma.dto.auth.SignupDto;
import f2b2.Comma.repository.StackRepository;
import f2b2.Comma.repository.UserStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserStackService userStackService;


    @Transactional
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody @Valid SignupDto signupDto, BindingResult bindingResult){
        System.out.println(signupDto.getStack());
        User user = signupDto.toEntity();
        User userEntity = userService.save(user);
        if(signupDto.getStack()!=null) {
            for (Long n : signupDto.getStack()) {
                userStackService.save(userEntity.getId(), n);
            }
        }

        return new ResponseEntity<>(new CMRespDto<>(1,"회원가입 성공", userEntity.getUsername()),HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> user(@PathVariable Long userId){
        return new ResponseEntity<>(new CMRespDto<>(1,"유저정보 찾기", userService.find(userId)),HttpStatus.OK);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user) {
        User member = userService.login(user.get("username"),user.get("password"));
        return new ResponseEntity<>(new CMRespDto<>(1,"로그인 성공", jwtTokenProvider.createToken(member.getUsername(), member.getRoles())),HttpStatus.OK);
    }


}
