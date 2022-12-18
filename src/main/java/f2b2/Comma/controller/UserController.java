package f2b2.Comma.controller;

import f2b2.Comma.domain.user.User;
import f2b2.Comma.domain.user.UserService;
import f2b2.Comma.dto.CMRespDto;
import f2b2.Comma.dto.auth.SignupDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid SignupDto signupDto, BindingResult bindingResult){
        User user = signupDto.toEntity();
        userService.save(user);
        return new ResponseEntity<>(new CMRespDto<>(1,"회원가입 성공", user),HttpStatus.OK);
    }
}
