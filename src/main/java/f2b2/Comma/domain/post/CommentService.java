package f2b2.Comma.domain.post;

import f2b2.Comma.handler.exception.CustomException;
import f2b2.Comma.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public void deleteByUser(Long userId) {
        commentRepository.deleteUserComment(userId);
    }

    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment find(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() -> {
            return new CustomException("존재하지 않는 댓글입니다.");
        });
    }
    public void delete(Comment comment){
        commentRepository.delete(comment);
    }
}
