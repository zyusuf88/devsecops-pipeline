output "vpc_id" {
  value = aws_vpc.this.id
}

output "public_subnets" {
  value = [aws_subnet.public_1.id, aws_subnet.public_2.id]
}
output "internet_gateway_id" {
  value = aws_internet_gateway.this.id
}
