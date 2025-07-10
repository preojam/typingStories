package com.lbm294.typingstories.dataTransferObject;

public class ScoreRequest {
    private Long storyId;
    private String component;
    private Double value;

    public Long getStoryId() { return storyId; }
    public void setStoryId(Long storyId) { this.storyId = storyId; }

    public String getComponent() { return component; }
    public void setComponent(String component) { this.component = component; }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }
}
