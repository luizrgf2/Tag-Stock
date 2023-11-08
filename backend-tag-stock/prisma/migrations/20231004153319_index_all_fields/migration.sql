-- CreateIndex
CREATE INDEX `products_branch_description_shelf_supervisor_idx` ON `products`(`branch`, `description`, `shelf`, `supervisor`);
