import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { stagingData } from "@/lib/staging-data"
import { ExternalLink } from "lucide-react"

export function StagingReference() {
  return (
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-medium mb-2">{stagingData.title}</CardTitle>
        <div className="text-sm text-muted-foreground mb-4">
          <p>Source: {stagingData.source}</p>
          <a
            href={stagingData.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center mt-1"
          >
            View official staging information <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
        <p className="text-sm">{stagingData.description}</p>
      </CardHeader>

      <CardContent className="px-0 space-y-6">
        <div>
          <h4 className="font-medium mb-2">{stagingData.categories.t.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{stagingData.categories.t.description}</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2 text-left">Category</th>
                  <th className="border p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {stagingData.categories.t.items.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2 font-medium">{item.id}</td>
                    <td className="border p-2">
                      {item.description}
                      {item.details && (
                        <div className="mt-1 text-xs">
                          {item.details.split("\n").map((line, i) => (
                            <div key={i}>
                              {line}
                              {i < item.details.split("\n").length - 1 && <br />}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">{stagingData.categories.n.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{stagingData.categories.n.description}</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2 text-left">Category</th>
                  <th className="border p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {stagingData.categories.n.items.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2 font-medium">{item.id}</td>
                    <td className="border p-2">
                      {item.description}
                      {item.details && (
                        <div className="mt-1 text-xs">
                          {item.details.split("\n").map((line, i) => (
                            <div key={i}>
                              {line}
                              {i < item.details.split("\n").length - 1 && <br />}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">{stagingData.categories.m.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{stagingData.categories.m.description}</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2 text-left">Category</th>
                  <th className="border p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {stagingData.categories.m.items.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2 font-medium">{item.id}</td>
                    <td className="border p-2">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">{stagingData.categories.b.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{stagingData.categories.b.description}</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2 text-left">Category</th>
                  <th className="border p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {stagingData.categories.b.items.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2 font-medium">{item.id}</td>
                    <td className="border p-2">
                      {item.description}
                      {item.details && (
                        <div className="mt-1 text-xs">
                          {item.details.split("\n").map((line, i) => (
                            <div key={i}>
                              {line}
                              {i < item.details.split("\n").length - 1 && <br />}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">ISCL/EORTC Staging for MF/SS</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2 text-left">Stage</th>
                  <th className="border p-2 text-left">T</th>
                  <th className="border p-2 text-left">N</th>
                  <th className="border p-2 text-left">M</th>
                  <th className="border p-2 text-left">B</th>
                </tr>
              </thead>
              <tbody>
                {stagingData.stages.map((stage) => (
                  <tr key={stage.stage}>
                    <td className="border p-2 font-medium">{stage.stage}</td>
                    <td className="border p-2">{stage.t}</td>
                    <td className="border p-2">{stage.n}</td>
                    <td className="border p-2">{stage.m}</td>
                    <td className="border p-2">{stage.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
