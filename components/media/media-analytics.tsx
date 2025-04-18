import { BarChart, LineChart, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// Sample data for charts
const storageData = [
  { name: "Images", value: 65, color: "hsl(var(--primary))" },
  { name: "Videos", value: 20, color: "hsl(var(--secondary))" },
  { name: "Documents", value: 10, color: "hsl(var(--accent))" },
  { name: "Audio", value: 5, color: "hsl(var(--destructive))" },
]

const usageData = [
  { date: "Jan", views: 1200, downloads: 450 },
  { date: "Feb", views: 1900, downloads: 670 },
  { date: "Mar", views: 1500, downloads: 550 },
  { date: "Apr", views: 2300, downloads: 890 },
  { date: "May", views: 2800, downloads: 1200 },
  { date: "Jun", views: 3500, downloads: 1800 },
]

export function MediaAnalytics() {
  return (
    <Card className="border border-border/40 bg-card/30 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Media Analytics</CardTitle>
          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            <span>Last 30 Days</span>
            <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.5 5.5L7.5 8.5L10.5 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <CardDescription>Track your media usage and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="storage" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="storage" className="flex items-center gap-1.5">
              <PieChart className="h-3.5 w-3.5" />
              <span>Storage</span>
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center gap-1.5">
              <LineChart className="h-3.5 w-3.5" />
              <span>Usage</span>
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center gap-1.5">
              <BarChart className="h-3.5 w-3.5" />
              <span>Types</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="storage" className="mt-0">
            <div className="flex">
              <div className="w-1/2 h-[180px] relative">
                {/* This would be a real chart in production */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-8 border-primary/20 relative">
                    <div className="absolute inset-0 border-8 border-primary rounded-full border-r-transparent border-b-transparent rotate-45"></div>
                    <div className="absolute inset-0 border-8 border-secondary rounded-full border-l-transparent border-t-transparent border-r-transparent rotate-[210deg]"></div>
                    <div className="absolute inset-0 border-8 border-accent rounded-full border-l-transparent border-t-transparent border-r-transparent rotate-[260deg]"></div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 space-y-2 pl-2">
                {storageData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
                <div className="pt-2">
                  <div className="text-xs text-muted-foreground">Total Storage</div>
                  <div className="text-lg font-semibold">
                    2.4 GB <span className="text-xs text-muted-foreground">/ 10 GB</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="mt-0">
            <div className="h-[180px] w-full relative">
              {/* This would be a real chart in production */}
              <div className="absolute inset-x-0 bottom-0 h-[150px]">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 flex items-end justify-between px-2">
                    {usageData.map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 w-1/6">
                        <div className="relative w-full">
                          <div
                            className="w-4 bg-primary/20 rounded-t-sm mx-auto"
                            style={{ height: `${(item.views / 3500) * 100}px` }}
                          >
                            <div
                              className="absolute bottom-0 w-4 bg-primary rounded-t-sm mx-auto"
                              style={{ height: `${(item.downloads / 3500) * 100}px` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-xs">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-primary/20"></div>
                  <span className="text-xs">Views</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-primary"></div>
                  <span className="text-xs">Downloads</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="types" className="mt-0">
            <div className="h-[180px] w-full relative">
              {/* This would be a real chart in production */}
              <div className="absolute inset-0 flex items-end justify-around px-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-[120px] w-12 bg-gradient-to-t from-primary to-primary/40 rounded-md"></div>
                  <span className="text-xs mt-1">JPG</span>
                  <span className="text-xs font-medium">42%</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-[80px] w-12 bg-gradient-to-t from-secondary to-secondary/40 rounded-md"></div>
                  <span className="text-xs mt-1">PNG</span>
                  <span className="text-xs font-medium">28%</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-[50px] w-12 bg-gradient-to-t from-accent to-accent/40 rounded-md"></div>
                  <span className="text-xs mt-1">SVG</span>
                  <span className="text-xs font-medium">15%</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-[30px] w-12 bg-gradient-to-t from-destructive to-destructive/40 rounded-md"></div>
                  <span className="text-xs mt-1">GIF</span>
                  <span className="text-xs font-medium">10%</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-[15px] w-12 bg-gradient-to-t from-muted-foreground to-muted-foreground/40 rounded-md"></div>
                  <span className="text-xs mt-1">Other</span>
                  <span className="text-xs font-medium">5%</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
