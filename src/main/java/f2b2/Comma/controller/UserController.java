package f2b2.Comma.controller;

import f2b2.Comma.config.provider.JwtTokenProvider;
import f2b2.Comma.domain.stack.UserStackService;
import f2b2.Comma.domain.user.User;
import f2b2.Comma.domain.user.UserService;
import f2b2.Comma.dto.CMRespDto;
import f2b2.Comma.dto.auth.OauthSignupDto;
import f2b2.Comma.dto.auth.SignupDto;
import f2b2.Comma.dto.jwt.JwtDto;
import f2b2.Comma.handler.exception.CustomValidationException;
import f2b2.Comma.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Map;


@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
public class UserController {
    @Value("${jwt.secret}")
    private String secretKey;

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

    @Transactional
    @PostMapping(value = "/kakaoSignup", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> kakaoSignUp(@ModelAttribute @Valid OauthSignupDto oauthSignupDto, BindingResult bindingResult){
        String preName = oauthSignupDto.getUsername();
        oauthSignupDto.setUsername("kakao_"+preName);

        if(!userRepository.findByUsername(oauthSignupDto.getUsername()).isEmpty()) {
            return new ResponseEntity<>(new CMRespDto<>(-1, "카카오 아이디 중복", null), HttpStatus.OK);
        }
        else if(!userRepository.findByNickName(oauthSignupDto.getNickName()).isEmpty()) {
            return new ResponseEntity<>(new CMRespDto<>(-1, "닉네임 중복", null), HttpStatus.OK);
        }
        else {
            User user = oauthSignupDto.toEntity();
            user.setKakaoId(preName);
            User loginUser = userService.save(user);
            if (oauthSignupDto.getStack() != null) {
                for (Long n : oauthSignupDto.getStack()) {
                    userStackService.save(loginUser.getId(), n);
                }
            }


            return new ResponseEntity<>(new CMRespDto<>(1,"로그인 성공", new JwtDto(jwtTokenProvider.createAccessToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()), jwtTokenProvider.createRefreshToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()))),HttpStatus.OK);
        }
    }

    @Transactional
    @PostMapping(value = "/googleSignup", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> googleSignUp(@ModelAttribute @Valid OauthSignupDto oauthSignupDto, BindingResult bindingResult){

        String preName = oauthSignupDto.getUsername();
        oauthSignupDto.setUsername("google_"+preName);

        if(!userRepository.findByUsername(oauthSignupDto.getUsername()).isEmpty()) {
            return new ResponseEntity<>(new CMRespDto<>(-1, "구글 아이디 중복", null), HttpStatus.OK);
        }
        else if(!userRepository.findByNickName(oauthSignupDto.getNickName()).isEmpty()) {
            return new ResponseEntity<>(new CMRespDto<>(-1, "닉네임 중복", null), HttpStatus.OK);
        }
        else {
            User user = oauthSignupDto.toEntity();
            user.setGoogleId(preName);
            User loginUser = userService.save(user);
            if (oauthSignupDto.getStack() != null) {
                for (Long n : oauthSignupDto.getStack()) {
                    userStackService.save(loginUser.getId(), n);
                }
            }
            return new ResponseEntity<>(new CMRespDto<>(1,"로그인 성공", new JwtDto(jwtTokenProvider.createAccessToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()), jwtTokenProvider.createRefreshToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()))),HttpStatus.OK);
        }
    }

    @Transactional
    @PostMapping(value = "/facebookSignup", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> facebookSignUp(@ModelAttribute @Valid OauthSignupDto oauthSignupDto, BindingResult bindingResult){

        String preName = oauthSignupDto.getUsername();
        oauthSignupDto.setUsername("facebook_"+preName);

        if(!userRepository.findByUsername(oauthSignupDto.getUsername()).isEmpty()) {
            return new ResponseEntity<>(new CMRespDto<>(-1, "페이스북 아이디 중복", null), HttpStatus.OK);
        }
        else if(!userRepository.findByNickName(oauthSignupDto.getNickName()).isEmpty()) {
            return new ResponseEntity<>(new CMRespDto<>(-1, "닉네임 중복", null), HttpStatus.OK);
        }
        else {
            User user = oauthSignupDto.toEntity();
            user.setFacebookId(preName);
            User loginUser = userService.save(user);
            if (oauthSignupDto.getStack() != null) {
                for (Long n : oauthSignupDto.getStack()) {
                    userStackService.save(loginUser.getId(), n);
                }
            }
            return new ResponseEntity<>(new CMRespDto<>(1,"로그인 성공", new JwtDto(jwtTokenProvider.createAccessToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()), jwtTokenProvider.createRefreshToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()))),HttpStatus.OK);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> userJWT(@PathVariable Long userId,@RequestHeader HttpHeaders headers){

            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(headers.get("Authorization").get(0));
            if(!claims.getBody().get("id").toString().equals(Long.toString(userId))){
                throw new CustomValidationException("권한이 없는 유저입니다.");
            }

        return new ResponseEntity<>(new CMRespDto<>(1,"유저정보 찾기", userService.find(userId)),HttpStatus.OK);
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user) {
        User loginUser = userService.login(user.get("username"),user.get("password"));
        return new ResponseEntity<>(new CMRespDto<>(1,"로그인 성공", new JwtDto(jwtTokenProvider.createAccessToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()), jwtTokenProvider.createRefreshToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()))),HttpStatus.OK);
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
