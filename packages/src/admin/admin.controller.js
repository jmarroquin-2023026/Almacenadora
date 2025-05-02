import { encrypt } from '../../utils/encrypt.js';
import Staff from '../staff/staff.model.js'

export const addAdmin = async () => {
    try {
        const defaultAdmin = await Staff.findOne({role: 'ADMIN'})
    if (!defaultAdmin) {
        const usuarioAdmin = new Staff({
                name: 'Diego',
                surname: 'Medina',
                CUI:'3024530590102',    
                email: `${process.env.ADMIN_EMAIL}`,
                password: await encrypt(`${process.env.ADMIN_PASSWORD}`),
                phone: '45910878',
                role: "ADMIN"
            })
            await usuarioAdmin.save();
            console.log('Default administrator added succesfully')
        }
    } catch (e) {
        console.error('General error', e)
    }
}




