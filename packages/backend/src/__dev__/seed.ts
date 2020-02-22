// import { createConnection } from 'typeorm';
// import ormconfig from '../../ormconfig';
// import { PhoneNumber } from '../entity/PhoneNumber';
// import { User } from '../entity/User';
// import { Thread } from '../entity/Thread';
// import { Message } from '../entity/Message';
// import { PasswordReset } from '../entity/PasswordReset';

// async function seed() {
//     const connection = await createConnection(ormconfig);

//     // Start by removing the ENTIRE world.
//     await Message.delete({});
//     await Thread.delete({});
//     await PhoneNumber.delete({});
//     await PasswordReset.delete({});
//     await User.delete({});

//     // Sync phone numbers from Twilio:
//     const phoneNumbers = await twilio.incomingPhoneNumbers.list();
//     for (const phoneNumber of phoneNumbers) {
//         const p = new PhoneNumber();
//         p.twilioSid = phoneNumber.sid;
//         p.phoneNumber = phoneNumber.phoneNumber;
//         await p.save();
//     }

//     // Create user account:
//     const user = new User();
//     user.email = 'admin@vapejuicejordan.rip';
//     user.name = 'Admin (DEV)';
//     await user.setPassword('admin');
//     await user.save();

//     await connection.close();
// }

// seed();
