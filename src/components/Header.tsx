import { Bell, CreditCard, DollarSign, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ModeToggle } from './ModeToggle'

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <DollarSign className="h-6 w-6" />
          <h1 className="text-lg font-semibold">MyBank</h1>
        </div>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <CreditCard className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

