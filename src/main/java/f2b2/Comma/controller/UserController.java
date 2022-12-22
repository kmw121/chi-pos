package f2b2.Comma.controller;

import f2b2.Comma.config.provider.JwtTokenProvider;
import f2b2.Comma.domain.stack.StackService;
import f2b2.Comma.domain.stack.UserStackService;
import f2b2.Comma.domain.user.User;
import f2b2.Comma.domain.user.UserService;
import f2b2.Comma.dto.CMRespDto;
import f2b2.Comma.dto.auth.SignupDto;
import f2b2.Comma.repository.StackRepository;
import f2b2.Comma.repository.UserRepository;
import f2b2.Comma.repository.UserStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;


@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserStackService userStackService;

    private final UserRepository userRepository;


    @Transactional
    @PostMapping(value = "/signup", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> signUp(@ModelAttribute @Valid SignupDto signupDto, BindingResult bindingResult){


        if(!userRepository.findByUsername(signupDto.getUsername()).isEmpty()) {

            return new ResponseEntity<>(new CMRespDto<>(-1, "이메일 중복", null), HttpStatus.OK);


        }
        else if(!userRepository.findByNickName(signupDto.getNickName()).isEmpty()) {
            return new ResponseEntity<>(new CMRespDto<>(-1, "닉네임 중복", null), HttpStatus.OK);
        }
        else {
            User user = signupDto.toEntity();
            User userEntity = userService.save(user);
            if (signupDto.getStack() != null) {
                for (Long n : signupDto.getStack()) {
                    userStackService.save(userEntity.getId(), n);
                }
            }
            return new ResponseEntity<>(new CMRespDto<>(1, "회원가입 성공", userEntity.getUsername()), HttpStatus.OK);
        }

        }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> user(@PathVariable Long userId){
        return new ResponseEntity<>(new CMRespDto<>(1,"유저정보 찾기", userService.find(userId)),HttpStatus.OK);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user) {
        User loginUser = userService.login(user.get("username"),user.get("password"));
        return new ResponseEntity<>(new CMRespDto<>(1,"로그인 성공", jwtTokenProvider.createToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId())),HttpStatus.OK);
    }

    @PostMapping("/dupUsername")
    public ResponseEntity<?> dupUsername(@RequestBody SignupDto signupDto){
        userService.findByUsername(signupDto.getUsername());
        return new ResponseEntity<>(new CMRespDto<>(1, "중복아이디 있음", null), HttpStatus.OK);
    }
    @PostMapping("/dupNickName")
    public ResponseEntity<?> dupNickName(@RequestBody SignupDto signupDto){
        userService.findByNickName(signupDto.getNickName());
        return new ResponseEntity<>(new CMRespDto<>(1, "중복아이디 있음", null), HttpStatus.OK);
    }




}
