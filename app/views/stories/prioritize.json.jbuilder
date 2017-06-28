if defined?(@changes)
  @changes.each do |change|
    json.set! change[:id] do
      json.extract! change, :priority
    end
  end
end
