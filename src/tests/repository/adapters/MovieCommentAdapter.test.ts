import {toDomainComment} from "../../../main/repository/adapters/MovieCommentAdapter";
import {ObjectId} from "mongodb";

describe('movieCommentAdapter', () => {
    const text = 'text';
    const email = 'email';
    const name = 'name';
    
    it('should adapt correctly', async () => {
        const comment = toDomainComment({
                _id: ObjectId.createFromHexString('573a1390f29313caabcd5a93'),
                text: text,
                email: email,
                name: name,
            }
        );

        expect(comment).toEqual({
            text: text,
            email: email,
            name: name,
        });
    });
});