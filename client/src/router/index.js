import Login from '../pages/Auth/login'
import Register from '../pages/Auth/register'
import HomePage from '../pages/HomePage'
import Rental from '../pages/Rental'
import ManagePost from '../pages/User/managePost'
import UpdateUser from '../pages/User/updateUser'
import Recharge from '../pages/User/recharge'
import ReahargeHistory from '../pages/User/rechargeHistory'
import UpdatePassword from '../pages/User/updatePassword'
import UpdatePhone from '../pages/User/updatePhone'
import CreatePost from '../pages/User/createPost'
import Detail from '../pages/Detail'

const publicRouter = [
    {path:'*', element:HomePage},
    {path:'login', element:Login},
    {path:'register', element:Register},
    {path:'cho-thue-can-ho', element: Rental},
    {path:'cho-thue-phong-tro', element: Rental},
    {path:'nha-cho-thue', element: Rental},
    {path:'cho-thue-mat-bang', element: Rental},
    {path:'post/detail/:postId', element:Detail}
]

const userRouter = [
    {path:'tin-dang', element:ManagePost},
    {path:'cap-nhat-thong-tin-ca-nhan', element:UpdateUser},
    {path:'nap-tien', element:Recharge},
    {path:'lich-su-nap-tien', element:ReahargeHistory},
    {path:'cap-nhat-thong-tin-ca-nhan/doi-mat-khau', element:UpdatePassword},
    {path:'cap-nhat-thong-tin-ca-nhan/doi-so-dien-thoai', element:UpdatePhone},
    {path:'dang-tin-moi', element:CreatePost},
]

const privateRouter = [
]

export { privateRouter, publicRouter, userRouter }