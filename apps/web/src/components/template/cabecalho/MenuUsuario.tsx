import { Menu, DefaultMantineColor } from '@mantine/core'
import {
    IconBuildingBank,
    IconCreditCard,
    IconForms,
    IconLayoutDashboard,
    IconListDetails,
    IconLogout,
    IconRepeat,
    IconSettings,
    IconTags,
} from '@tabler/icons-react'
import useCentralDeAcesso from '../../../data/hooks/useCentralDeAcesso'
import Avatar from './Avatar'
import useDimensoes from '../../../data/hooks/useDimensoes'
import Link from 'next/link'

interface MenuItemUsuarioProps {
    texto: string
    icone?: any
    url?: string
    cor?: DefaultMantineColor
    onClick?: () => void
    corIcone?: string
    corTexto?: string
}

function MenuItemUsuario(props: MenuItemUsuarioProps) {
    const finalProps: any = {
        color: props.cor,
        icon: props.icone,
        onClick: () => props.onClick?.(),
    }

    return props.url ? (
        <Link href={props.url}>
            <Menu.Item {...finalProps}>{props.texto}</Menu.Item>
        </Link>
    ) : (
        <Menu.Item {...finalProps}>{props.texto}</Menu.Item>
    )
}

export default function MenuUsuario() {
    const { usuario, logout } = useCentralDeAcesso()
    const { lgOuMaior } = useDimensoes()

    return (
        <Menu width={200} withArrow>
            <Menu.Target>
                {usuario && (
                    <button className="p-1 outline-none flex items-center gap-4">
                        {lgOuMaior && (
                            <div className="flex flex-col items-end">
                                <span className="font-extrabold">{usuario.nome}</span>
                                <span className="text-xs text-zinc-400">{usuario.email}</span>
                            </div>
                        )}
                        <Avatar usuario={usuario} />
                    </button>
                )}
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Início</Menu.Label>
                <MenuItemUsuario icone={<IconLayoutDashboard />} texto="Dashboard" url="/" />

                <Menu.Label>Finanças</Menu.Label>
                <MenuItemUsuario
                    icone={<IconListDetails />}
                    texto="Extrato"
                    url="/financas/extrato"
                />
                <MenuItemUsuario
                    icone={<IconBuildingBank />}
                    texto="Contas"
                    url="/financas/contas"
                />
                <MenuItemUsuario
                    icone={<IconCreditCard />}
                    texto="Cartões"
                    url="/financas/cartoes"
                />
                <MenuItemUsuario
                    icone={<IconTags />}
                    texto="Categorias"
                    url="/financas/categorias"
                />

                <Menu.Label className="mt-4">Relatórios</Menu.Label>
                <MenuItemUsuario
                    icone={<IconRepeat />}
                    texto="Recorrências"
                    url="/relatorios/recorrencias"
                />
                <MenuItemUsuario
                    icone={<IconCreditCard />}
                    texto="Gastos nos Cartões"
                    url="/relatorios/cartoes"
                />

                <Menu.Label className="mt-4">Menu Usuário</Menu.Label>
                <MenuItemUsuario
                    icone={<IconForms />}
                    texto="Dados Cadastrais"
                    url="/usuario/cadastro"
                />
                <MenuItemUsuario
                    icone={<IconSettings />}
                    texto="Configurações"
                    url="/usuario/configuracoes"
                />

                <Menu.Divider className="mt-4" />
                <MenuItemUsuario
                    cor="red"
                    icone={<IconLogout />}
                    texto="Sair da Plataforma"
                    onClick={logout}
                />
            </Menu.Dropdown>
        </Menu>
    )
}
