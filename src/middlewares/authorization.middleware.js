
// export const authorization = role =>{
//     return (req, res, next) =>{
//        const user= req.user.user
//        if(!req.user) return res.status(401).send("No esta autorizado")
//        // console.log ('authorization', user.role)
//         if(user.role !== role) return res.status(401).send("No tiene permisos")
//         next()
//     }
// }

export const authorization = (...roles) =>{
    return (req, res, next) =>{
       const user= req.user.user
       if(!req.user) return res.status(401).send("No esta autorizado")

        const userRole = user.role.toUpperCase();
        const authorizedRoles = roles.map(role => role.toUpperCase());
        
        if (authorizedRoles.includes('PUBLIC')) return next();
        if (!authorizedRoles.includes(userRole)) {
            return res.status(401).send({ status: 'error', error: 'No tiene permisos' });
        }
        next()
    }
}
