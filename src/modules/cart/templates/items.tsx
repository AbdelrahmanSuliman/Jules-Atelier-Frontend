import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}
const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <div className="text-white">
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem] !text-white">
          Cart
        </Heading>
      </div>

      <Table className="!text-white">
        <Table.Header className="border-t-0 !text-white">
          <Table.Row className="txt-medium-plus !text-white">
            <Table.HeaderCell className="!pl-0 !text-white">
              Item
            </Table.HeaderCell>
            <Table.HeaderCell className="!text-white" />
            <Table.HeaderCell className="!text-white">
              Quantity
            </Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell !text-white">
              Price
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right !text-white">
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body className="!text-white">
          {items
            ? items
                .sort((a, b) =>
                  (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                )
                .map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                ))
            : repeat(5).map((i) => (
                <SkeletonLineItem key={i} />
              ))}
        </Table.Body>
      </Table>
    </div>
  )
}


export default ItemsTemplate
