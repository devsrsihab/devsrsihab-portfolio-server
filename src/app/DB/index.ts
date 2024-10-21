import config from '../config';
import { User } from '../modules/user/user.model';

const superUser = {
  id: 'A0001',
  email: config.admin_email,
  name: {
    firstName: 'Admin',
    lastName: 'Admin',
  },
  username: 'admin0018',
  password: config.admin_password,
  needsPasswordChange: false,
  role: 'admin',
  status: 'active',
  isDeleted: false,
};

const seedFirstAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: 'admin' });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedFirstAdmin;
