class CreateFinders < ActiveRecord::Migration
  def change
    create_table :finders do |t|
      t.string :gender

      t.timestamps
    end
  end
end
