import { useNavigate } from 'react-router-dom'
import { FolderKanban, Users, CheckSquare, Activity } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: FolderKanban,
      title: 'Workspaces',
      description: 'Multi-tenant orgs',
    },
    {
      icon: Users,
      title: 'Roles',
      description: 'Admin and member access',
    },
    {
      icon: CheckSquare,
      title: 'Tasks',
      description: 'Assign and track',
    },
    {
      icon: Activity,
      title: 'Activity',
      description: 'Full audit feed',
    },
  ]

  return (
    <div className='relative h-screen bg-zinc-950 overflow-hidden'>

      {/* Background layer */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 opacity-[0.03]'>
          <div className='h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]' />
        </div>
        <div className='absolute top-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-cyan-400/20 blur-[100px]' />
        <div className='absolute bottom-[-10rem] right-[-10rem] h-[25rem] w-[25rem] rounded-full bg-blue-500/20 blur-[100px]' />
      </div>

      {/* Content */}
      <div className='relative z-10 flex h-full flex-col'>

        {/* Navbar */}
        <div className='flex shrink-0 items-center justify-between border-b border-zinc-800 px-6 py-4 md:px-10'>
          <h1 className='text-xl font-semibold tracking-tight text-zinc-100'>
            Stack<span className='text-orange-400'>Ops</span>
          </h1>

          <div className='flex items-center gap-3'>
            <button
              onClick={() => navigate('/login')}
              className='rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-zinc-100 cursor-pointer'
            >
              Login
            </button>

            <button
              onClick={() => navigate('/signup')}
              className='rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-all hover:bg-orange-400 cursor-pointer'
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className='flex flex-1 min-h-0 flex-col items-center justify-center px-6 text-center'>
          <h2 className='max-w-2xl text-2xl font-semibold tracking-tight text-zinc-100 md:text-4xl'>
            Organize work. Track progress.
            <br />
            Stay in sync.
          </h2>

          <p className='mt-3 max-w-md text-sm text-zinc-400'>
            Multi-tenant workspaces, tasks, and activity tracking for teams that ship.
          </p>

          <div className='mt-6 flex items-center gap-3'>
            <button
              onClick={() => navigate('/signup')}
              className='rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-medium text-zinc-950 transition-all hover:bg-orange-400 cursor-pointer'
            >
              Get started
            </button>

            <button
              onClick={() => navigate('/login')}
              className='rounded-xl border border-zinc-700 px-6 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:bg-zinc-800 cursor-pointer'
            >
              Sign in
            </button>
          </div>

          {/* Features */}
          <div className='mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4'>
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className='rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3 text-left transition-all hover:border-zinc-700'
                >
                  <Icon size={16} className='text-orange-400' />
                  <p className='mt-2 text-sm font-medium text-zinc-200'>
                    {feature.title}
                  </p>
                  <p className='mt-0.5 text-xs text-zinc-500'>
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className='shrink-0 border-t border-zinc-800 px-6 py-3 text-center'>
          <p className='text-xs text-zinc-600'>
          	&copy;  Built by Mohammad Zaib
          </p>
        </div>

      </div>
    </div>
  )
}

export default Home