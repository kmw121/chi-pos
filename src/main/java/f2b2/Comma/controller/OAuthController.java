package f2b2.Comma.controller;

import f2b2.Comma.config.provider.JwtTokenProvider;
import f2b2.Comma.domain.oauth.OAuthService;
import f2b2.Comma.domain.user.User;
import f2b2.Comma.domain.user.UserService;
import f2b2.Comma.dto.CMRespDto;
import f2b2.Comma.dto.jwt.JwtDto;
import f2b2.Comma.handler.exception.CustomAuthException;
import f2b2.Comma.handler.exception.CustomException;
import f2b2.Comma.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;


    @ResponseBody
    @GetMapping("/ouath/kakao")
    public ResponseEntity<?> kakaoCallback(@RequestParam String code) {
        System.out.println("실행됨.1");
        String kakaoAccessToken = oAuthService.getKakaoAccessToken(code);
        System.out.println("실행됨.2");
        String userId = oAuthService.createKakaoUser(kakaoAccessToken);
        System.out.println("실행됨.3");
        User loginUser = userRepository.findByKakaoId(userId).orElseThrow(()->{
            throw new CustomAuthException("카카오 회원가입이 안된 회원",userId);
        });

        return new ResponseEntity<>(new CMRespDto<>(1,"로그인 성공", new JwtDto(jwtTokenProvider.createAccessToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()), jwtTokenProvider.createRefreshToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()))),HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("/ouath/google")
    public ResponseEntity<?> googleCallback(@RequestParam String code) {
        String userId = oAuthService.createGoogleUser(code);
        User loginUser = userRepository.findByGoogleId(userId).orElseThrow(()->{
            throw new CustomAuthException("구글 회원가입이 안된 회원",userId);
        });

        return new ResponseEntity<>(new CMRespDto<>(1,"로그인 성공", new JwtDto(jwtTokenProvider.createAccessToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()), jwtTokenProvider.createRefreshToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()))),HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("/ouath/facebook")
    public ResponseEntity<?> facebookCallback(@RequestParam String code) {
        String userId = oAuthService.createFacebookUser(code);
        User loginUser = userRepository.findByFacebookId(userId).orElseThrow(()->{
            throw new CustomAuthException("페이스북 회원가입이 안된 회원",userId);
        });
        return new ResponseEntity<>(new CMRespDto<>(1,"로그인 성공", new JwtDto(jwtTokenProvider.createAccessToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()), jwtTokenProvider.createRefreshToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()))),HttpStatus.OK);
    }
    @ResponseBody
    @GetMapping("/ouath/git")
    public ResponseEntity<?> gitCallback(@RequestParam String code) {
        String userId = oAuthService.createGitUser(code);
        User loginUser = userRepository.findByGitId(userId).orElseThrow(()->{
            throw new CustomAuthException("깃 회원가입이 안된 회원",userId);
        });
        return new ResponseEntity<>(new CMRespDto<>(1,"로그인 성공", new JwtDto(jwtTokenProvider.createAccessToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()), jwtTokenProvider.createRefreshToken(loginUser.getUsername(), loginUser.getRoles(), loginUser.getId()))),HttpStatus.OK);
    }
}