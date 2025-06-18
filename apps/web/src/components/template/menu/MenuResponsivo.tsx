import { Drawer } from "@mantine/core"
import useMenu from "../../../data/hooks/useMenu"
import Menu from "./Menu"

export default function MenuResponsivo() {
    const { drawer, mini, aberto, fecharMenu } = useMenu()

    return !mini && drawer ? (
        <Drawer
            opened={aberto}
            onClose={fecharMenu}
            className="flex flex-col"
            withCloseButton={false}
            size={300}
        ><Menu /></Drawer>
    ) : (
        <Menu />
    )
}