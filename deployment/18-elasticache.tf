resource "aws_elasticache_subnet_group" "elasticache_subnet_group" {
  name       = "${local.prefix}-subnet-elasticache-group"
  subnet_ids = [aws_subnet.private_subnet_a.id, aws_subnet.private_subnet_b.id]
}

resource "aws_elasticache_replication_group" "chatapp_redis_cluster" {
  automatic_failover_enabled = true
  replication_group_id       = "${local.prefix}-redis"
  node_type                  = var.elasticache_node_type
  description                = "Redis elasticache replication group"
  num_cache_clusters         = 2
  parameter_group_name       = var.elasticache_parameter_group_name
  port                       = 6379
  multi_az_enabled           = true
  subnet_group_name          = aws_elasticache_subnet_group.elasticache_subnet_group.name
  security_group_ids         = [aws_security_group.elasticache_sg.id]

  depends_on = [
    aws_security_group.elasticache_sg
  ]

  provisioner "local-exec" {
    command = file("./userdata/update-env-file.sh")

    environment = {
      ELASTICACHE_ENDPOINT = self.primary_endpoint_address
    }
  }

  tags = merge(
    local.common_tags,
    tomap({ "Name" = "${local.prefix}-elasticache" })
  )
}
resource "aws_elasticache_replication_group" "chatapp_replication_group" {
  automatic_failover_enabled  = true
  preferred_cache_cluster_azs = ["us-east-1a", "us-east-1b"]
  replication_group_id        = "tf-rep-group-1"
  description                 = "aws_elasticache_replication_group description"
  node_type                   = "cache.m4.large"
  num_cache_clusters          = 2
  parameter_group_name        = "default.redis7"
  port                        = 6379
}
