import {
    IconArrowsDiff,
    IconBuildingBank,
    IconCreditCard,
    IconForms,
    IconLayoutDashboard,
    IconListDetails,
    IconRepeat,
    IconSettings,
    IconTags,
} from '@tabler/icons-react'
import Logo from './Logo'
import MenuItem from './MenuItem'
import MenuSecao from './MenuSecao'
import useMenu from '../../../data/hooks/useMenu'

interface MenuProps {
    className?: string
}

export default function Menu(props: MenuProps) {
    const { mini, itemMenuClicado } = useMenu()

    return (
        <div
            style={{ width: mini ? 76 : 300 }}
            className={`
                relative flex flex-col overflow-y-auto
                bg-[#111] border-0 ${mini && 'items-center'}
                ${props.className ?? ''}
            `}
        >
            <div
                className={`
                    flex justify-between items-center
                    min-h-[74px] py-5 ${mini ? 'px-3.5' : 'px-5'}
                `}
            >
                <Logo mini={mini} />
            </div>
            <div
                className={`
                    flex flex-col flex-1 ${mini && 'items-center'}
                `}
            >
                <MenuSecao titulo="INÍCIO" mini={mini} />
                <MenuItem
                    href="/"
                    texto="Dashboard"
                    icone={<IconLayoutDashboard />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />

                <MenuSecao titulo="FINANÇAS" mini={mini} />
                <MenuItem
                    href="/financas/extrato"
                    texto="Extrato"
                    icone={<IconListDetails />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />
                <MenuItem
                    href="/financas/contas"
                    texto="Contas"
                    icone={<IconBuildingBank />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />
                <MenuItem
                    href="/financas/cartoes"
                    texto="Cartões"
                    icone={<IconCreditCard />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />
                <MenuItem
                    href="/financas/categorias"
                    texto="Categorias"
                    icone={<IconTags />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />

                <MenuSecao titulo="RELATÓRIOS" tituloPq="RELAT." mini={mini} />
                <MenuItem
                    href="/relatorios/recorrencias"
                    texto="Evolução Recorrências"
                    icone={<IconRepeat />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />
                <MenuItem
                    href="/relatorios/contas"
                    texto="Saldo nas Contas"
                    icone={<IconBuildingBank />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />
                <MenuItem
                    href="/relatorios/cartoes"
                    texto="Gastos nos Cartões"
                    icone={<IconCreditCard />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />
                <MenuItem
                    href="/relatorios/receitasdespesas"
                    texto="Receitas vs Despesas"
                    icone={<IconArrowsDiff />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />

                <MenuSecao titulo="USUÁRIO" mini={mini} />
                <MenuItem
                    href="/usuario/cadastro"
                    texto="Cadastro de Usuário"
                    icone={<IconForms />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />
                <MenuItem
                    href="/usuario/configuracoes"
                    texto="Configurações"
                    icone={<IconSettings />}
                    mini={mini}
                    onClick={itemMenuClicado}
                />
            </div>
        </div>
    )
}
