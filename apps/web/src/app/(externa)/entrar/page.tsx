'use client'
import { Button } from '@mantine/core'
import { IconBrandFacebook, IconBrandGoogle, IconBrandYahoo } from '@tabler/icons-react'
import Logo from '@/components/template/menu/Logo'
import Titulo from '@/components/template/base/Titulo'
import useCentralDeAcesso from '@/data/hooks/useCentralDeAcesso'

export default function Entrar() {
    const { loginGoogle, loginFacebook, loginYahoo } = useCentralDeAcesso()

    return (
        <div className={`flex flex-col justify-center items-center h-full`}>
            <Logo className="mb-8" />
            <div
                className={`
                    flex flex-col items-center drop-shadow-2xl
                    bg-black rounded-xl p-8 sm:p-16 border border-zinc-900
                    sm:w-[450px]
                `}
            >
                <h1 className="font-black text-3xl">
                    Vamos <Titulo titulo={['Pou', 'par']} className="text-3xl" inline />?
                </h1>
                <h2 className="text-zinc-600">Bem vindo de volta!</h2>
                <hr className="my-6 border border-zinc-900 self-stretch" />
                <h2 className="text-zinc-600 mb-4">Selecione uma opção de login!</h2>
                <Button
                    onClick={loginGoogle}
                    variant="outline"
                    color="red"
                    size="lg"
                    leftSection={<IconBrandGoogle />}
                    className="self-stretch"
                >
                    Entrar com Google
                </Button>
                <Button
                    onClick={loginFacebook}
                    variant="outline"
                    color="blue"
                    size="lg"
                    leftSection={<IconBrandFacebook />}
                    className="self-stretch mt-2"
                >
                    Entrar com Facebook
                </Button>
                <Button
                    onClick={loginYahoo}
                    variant="outline"
                    color="violet"
                    size="lg"
                    leftSection={<IconBrandYahoo />}
                    className="self-stretch mt-2"
                >
                    Entrar com Yahoo
                </Button>
            </div>
        </div>
    )
}
