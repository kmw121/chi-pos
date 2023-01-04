package f2b2.Comma.controller;

import f2b2.Comma.dto.CMRespDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/oauth")
public class OAuthController {

    /**
     * 카카오 callback
     * [GET] /oauth/kakao/callback
     */
    @ResponseBody
    @GetMapping("/kakao")
    public ResponseEntity<?> kakaoCallback(@RequestParam String code) {
        System.out.println(code);
        return new ResponseEntity<>(new CMRespDto<>(1, "코드 받기 성공", code), HttpStatus.OK);
    }
}