import { createAuth} from '@keystone-next/auth';
import { config, createSchema} from '@keystone-next/keystone/schema';
import {User} from './schemas/User';
import {withItemData, statelessSessions} from '@keystone-next/keystone/session';

//makes MongoDB variables available
import 'dotenv/config';

const databaseURL =  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial'

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, //how long user signed in
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password']
        // TODO: Add in initial roles
    }
});

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONT_END_URL],
            credentials: true,
        }
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL
        // TODO Add data seeding here
    },
    lists: createSchema({
        User
    }),
    ui: {
        // show the UI only for people who pass this test
        isAccessAllowed: ({session}) => {
            console.log(session);
            return !!session?.data;
        },
    },
    // TODO: add session values here
    session: withItemData(statelessSessions(sessionConfig), {
        User: 'id name email'
    })
}));