"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Sample transaction data
const transactions = [
  { id: 1, date: "2023-05-01", description: "Salary Deposit", amount: 5000 },
  { id: 2, date: "2023-05-02", description: "Rent Payment", amount: -1500 },
  { id: 3, date: "2023-05-05", description: "Grocery Shopping", amount: -200 },
  { id: 4, date: "2023-05-10", description: "Utility Bill", amount: -150 },
  { id: 5, date: "2023-05-15", description: "Restaurant Dinner", amount: -80 },
  { id: 6, date: "2023-05-20", description: "Online Purchase", amount: -120 },
  { id: 7, date: "2023-05-25", description: "Gas Station", amount: -60 },
  { id: 8, date: "2023-05-31", description: "Interest Credit", amount: 10 },
]

// Calculate running balance for chart data
const chartData = transactions.reduce((acc, transaction, index) => {
  const balance = index === 0 ? transaction.amount : acc[index - 1].balance + transaction.amount
  acc.push({ date: transaction.date, balance })
  return acc
}, [] as { date: string; balance: number }[])

export default function BankTransactions() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Bank Transactions</CardTitle>
        <CardDescription>Your recent transactions and balance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <ChartContainer
            config={{
              balance: {
                label: "Balance",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => format(new Date(value), "MMM dd")}
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="var(--color-balance)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 8,
                    onClick: (_, index) => setActiveIndex(index?.payload.index ?? null),
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={transaction.id} className={activeIndex === index ? "bg-muted" : ""}>
                  <TableCell>{format(new Date(transaction.date), "MMM dd, yyyy")}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={`text-right ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {transaction.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

