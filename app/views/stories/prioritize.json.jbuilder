if defined?(@changes)
  @changes.each do |change|
    json.set! change[:id] do
      if (change[:updated_at])
        json.extract! change, :priority, :updated_at
      else
        json.extract! change, :priority
      end
    end
  end
end
