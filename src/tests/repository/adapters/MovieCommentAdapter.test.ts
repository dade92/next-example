import {toDomainComment} from "../../../main/repository/adapters/MovieCommentAdapter";

describe('movieCommentAdapter', () => {
    const text = 'text';
    const email = 'email';
    const name = 'name';
    
    it('should adapt correctly', () => {
        const mockMongoComment = {
            _id: 'mock-object-id',
            text: text,
            email: email,
            name: name,
        };

        const comment = toDomainComment(mockMongoComment as any);

        expect(comment).toEqual({
            text: text,
            email: email,
            name: name,
        });
    });
});