package f2b2.Comma.controller;

import f2b2.Comma.domain.oauth.OAuthService;
import f2b2.Comma.dto.CMRespDto;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;

    /**
     * 카카오 callback
     * [GET] /oauth/kakao/callback
     */
    @ResponseBody
    @GetMapping("/ouath/kakao")
    public ResponseEntity<?> kakaoCallback(@RequestParam String code) {
        System.out.println(code);
        String kakaoAccessToken = oAuthService.getKakaoAccessToken(code);
        String[] kakaoUserInfo = oAuthService.createKakaoUser(kakaoAccessToken);

        return new ResponseEntity<>(new CMRespDto<>(1, "코드 받기 성공", kakaoUserInfo), HttpStatus.OK);
    }
}