import Staff from '../staff/staff.model.js'

const addAdmin = async () => {
    try {
        const defaultAdmin = await Staff.findOne({role: 'ADMIN'})
    if (!defaultAdmin) {
        const usuarioAdmin = new Staff({
                name: 'Diego',
                surname: 'Medina',
                CUI:'3024530590102',
                username: `${process.env.ADMIN_USER}`,
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
 
addAdmin()

