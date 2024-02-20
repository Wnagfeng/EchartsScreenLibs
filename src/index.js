import SvgLoading from './component/Loading/inedx'
import FlyBox from './component/Container/inedx'
import Container from './component/Container/inedx'
import VueEcahrts from "./component/VueEcahrts";
import BaseScoreList from './component/BaseScoreList/index'
export default function (vue) {
    vue.use(SvgLoading)
    vue.use(FlyBox)
    vue.use(Container)
    vue.use(VueEcahrts)
    vue.use(BaseScoreList)
}