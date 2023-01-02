package f2b2.Comma.dto.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtDto {
    private String accessToken;
    private String refreshToken;
}
