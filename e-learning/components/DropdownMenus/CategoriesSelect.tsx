"use client"
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const existingcategories = ["AI", "Deep Learning", "Machine Learning", "DevOps", "Cloud"]

function CategoriesSelect({categories, setcategories}: {categories: string[], setcategories: any}) {
    const handleToggleCategory = (category: string, isChecked: boolean) => {
        setcategories((prevSelected: string[]) => 
          isChecked 
            ? [...prevSelected, category] 
            : prevSelected.filter(selected => selected !== category)
        );
      };
    
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-fit">
            <Button variant="outline">Choose categories</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {existingcategories.map(category => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={categories.includes(category)}
                onCheckedChange={(isChecked) => handleToggleCategory(category, isChecked)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    export default CategoriesSelect;